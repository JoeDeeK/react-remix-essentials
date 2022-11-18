import { Link } from '@remix-run/react';
import styles from './NoteList.css';

function NoteList({ notes }) {
  return (
    <ul id="note-list">
      {notes.map((note, index) => (
        <li key={note.id} className="note">
          {/* link component supports relative paths i.e. /note-1.
          note.id in this case is simply appended to the currently active path.
          If we include '/' + note.id then I think this will create a new path from root?
          Instead we will edit the actual route name from $noteId => notes.$noteId which tells
          Remix this note should load after notes path. If it doesn't we will load our 404
          page instead (set up in root/notes catchBoundrary) */}
          <Link to={note.id}>
            <article>
              <header>
                <ul className="note-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={note.id}>
                      {new Date(note.id).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </li>
                </ul>
                <h2>{note.title}</h2>
              </header>
              <p>{note.content}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}