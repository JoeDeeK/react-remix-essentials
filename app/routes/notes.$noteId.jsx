//$ (placeholder) at begining of file name tells Remix this is a dynamic route, what you enter after the $ for the name can be anything
// $noteId => notes.$noteId means this page will not show up on /abc but only after notes/. catchBoundrary is now working again for unfamiliar pages.

import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";
import styles from '~/styles/note-details.css';

export default function NoteDetailsPage() {
    const note = useLoaderData();
    return (
        <main id="note-details">
            <header>
                <nav>
                    <Link to="/notes">Back to all Notes</Link>
                </nav>
                <h1>{note.title}</h1>
            </header>
            <p id="note-details-content">{note.content}</p>
        </main>
    );
}

// using to load data from backend. has a request and params parameter (same for action method)
export async function loader({params}) {
    const notes = await getStoredNotes();
    const noteId = params.noteId; // identifier used after $ in routes folder
    const selectedNote = notes.find(note => note.id === noteId);

    // will catch this in root component and display if id does not exist
    if (!selectedNote) {
        throw json({message: 'Could not find note for id + noteId'}, {status: 404});
    }

    return selectedNote;
}

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}