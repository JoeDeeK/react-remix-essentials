import { json, redirect } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, { links as noteListLinks } from '~/components/NoteList';
import { getStoredNotes, storeNotes } from '~/data/notes';

export default function NotesPage() {
  // Remix hook used to access data from the loader()
  const notes = useLoaderData();
  console.log(notes.length)
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

/* loader is also a reserved name for Remix. This function will get called whenever a get request
  reaches this route, this component wants to get rerendered. *this component is pre-rendered on
  the server and then sent to the client. Making this function async because we are retrieving our notes here.
  */
export async function loader() {
  // more backend code here (never reaches the client side)
  // async was removed from this here ?
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    // throw new Response() or use shorter json function like here
    // When you throw a string, the ErrorBoundary will be used.
    // When you return, the default page will be used.
    // When you throw a response (i.e. json) the CatchBoundary will be used.
    throw json(
      { message: 'Could not find any notes.' },
      {
        status: 404,
        ststusText: 'Not Found',
      }
    );
  }
  // const data = useActionData(); // can do this in NewNote.jsx instead where the actual form is, will still have access because closest to.
  // stringify json and add headers using Remix function, easier way instead of returning raw data
  // return json(notes);
  return notes;
}

/* This action function name is expected by Remix. Whatever we put inside
  this function runs on the server. This will be triggered by post requests that come from same page.
  Does not have to be async function,  but we will use here because we are getting data.
*/
export async function action({request}) {
  // lets subscract the data from the incoming request send from NewNote form
  const formData = await request.formData();
  // const noteData = {
  //   title: formData.get('title'),
  //   content: formData.get('content')
  // }
  // shortcut use Object.fromEntries instead to extract data into a standard js object with passed properties
  const noteData = Object.fromEntries(formData);

  // add validation
  if (noteData.title.trim().length < 5) {
    return {message: 'Invalid title - must be at least 5 characters long.'};
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString(); // not necessarly unique if run same time, but okay for this example
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  // setTimeout to test button display
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

  // This is where you would redirect user, but we don't need to do that in this case, still here is example of how.
  // we should return a response here which redirects the user to a different page.
  return redirect("/notes");
}

// can also use this to override pages. This catches response errors generated from backend
// individual page catchBoundary will override root page catchBoundary, same goes for ErrorBoundary
export function CatchBoundary() {
  // use the useCatach hook to get a hold of the throws response data
  const caughtResponse = useCatch();
  // can get a hold of many properties ie status, statusText, data, etc
  const message = caughtResponse.data?.message || 'Data not found.';

  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  )
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

// Remix meta funchion for setting up neta data
// * meta data on other pages will be wrapped with this i.e. root meta. This lower level meta data wins over generic meta data.
// data property holds data from loader. can also access params here.
export function meta({data}) {
  return {
    title: data.title,
    description: 'Manage your notes with ease'
  };
}