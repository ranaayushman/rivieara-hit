import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/jwt";
import { validateBannerFile, buildFileName } from "@/lib/helpers";
import type { Event } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  GET /api/admin/events                                              */
/*  Return all events (admin-only).                                    */
/* ------------------------------------------------------------------ */

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const supabase = getSupabase();

    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Fetch events error:", error);
      return NextResponse.json(
        { error: "Failed to fetch events" },
        { status: 500 }
      );
    }

    return NextResponse.json({ events }, { status: 200 });
  } catch (err) {
    console.error("GET /api/admin/events error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ------------------------------------------------------------------ */
/*  POST /api/admin/events                                             */
/*  Create a new event. Accepts multipart form-data with an optional   */
/*  image file uploaded to the "event-banners" bucket.                 */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const date = formData.get("date") as string | null;
    const venue = formData.get("venue") as string | null;
    const image = formData.get("image") as File | null;

    if (!title || !description || !date || !venue) {
      return NextResponse.json(
        { error: "title, description, date, and venue are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    let bannerUrl: string | null = null;

    if (image && image.size > 0) {
      const fileError = validateBannerFile(image);
      if (fileError) {
        return NextResponse.json({ error: fileError }, { status: 400 });
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      const fileName = buildFileName(image.name);

      const { error: uploadError } = await supabase.storage
        .from("event-banners")
        .upload(fileName, buffer, {
          contentType: image.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Image upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from("event-banners")
        .getPublicUrl(fileName);

      bannerUrl = publicUrlData.publicUrl;
    }

    const { data: event, error: insertError } = await supabase
      .from("events")
      .insert({ title, description, date, venue, banner_url: bannerUrl })
      .select()
      .single<Event>();

    if (insertError) {
      console.error("Insert event error:", insertError);
      return NextResponse.json(
        { error: "Failed to create event" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Event created", event },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/admin/events error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ------------------------------------------------------------------ */
/*  PUT /api/admin/events                                              */
/*  Update an existing event. Accepts multipart form-data.             */
/* ------------------------------------------------------------------ */

export async function PUT(req: NextRequest) {
  try {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const formData = await req.formData();

    const id = formData.get("id") as string | null;
    if (!id) {
      return NextResponse.json(
        { error: "Event id is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const updates: Record<string, string> = {};
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const date = formData.get("date") as string | null;
    const venue = formData.get("venue") as string | null;
    const image = formData.get("image") as File | null;

    if (title) updates.title = title;
    if (description) updates.description = description;
    if (date) updates.date = date;
    if (venue) updates.venue = venue;

    if (image && image.size > 0) {
      const fileError = validateBannerFile(image);
      if (fileError) {
        return NextResponse.json({ error: fileError }, { status: 400 });
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      const fileName = buildFileName(image.name);

      const { error: uploadError } = await supabase.storage
        .from("event-banners")
        .upload(fileName, buffer, {
          contentType: image.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Image upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from("event-banners")
        .getPublicUrl(fileName);

      updates.banner_url = publicUrlData.publicUrl;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const { data: event, error: updateError } = await supabase
      .from("events")
      .update(updates)
      .eq("id", id)
      .select()
      .single<Event>();

    if (updateError) {
      console.error("Update event error:", updateError);
      return NextResponse.json(
        { error: "Failed to update event" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Event updated", event },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT /api/admin/events error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ------------------------------------------------------------------ */
/*  DELETE /api/admin/events                                           */
/*  Delete an event by id (passed as ?id=<uuid> query param).          */
/* ------------------------------------------------------------------ */

export async function DELETE(req: NextRequest) {
  try {
    const auth = await verifyAdminToken(req);
    if (auth instanceof NextResponse) return auth;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Event id query parameter is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { error: deleteError } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Delete event error:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete event" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Event deleted" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /api/admin/events error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
