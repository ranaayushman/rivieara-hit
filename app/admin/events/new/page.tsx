"use client";

import EventForm from "../_components/EventForm";
import PageHeader from "../../_components/PageHeader";

/* ------------------------------------------------------------------ */
/*  /admin/events/new — Create a new event                             */
/* ------------------------------------------------------------------ */

export default function NewEventPage() {
  return (
    <div>
      <PageHeader title="New Event" />
      <EventForm />
    </div>
  );
}
