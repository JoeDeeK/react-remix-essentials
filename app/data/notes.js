import fs from 'fs/promises';
// This file contains helper functions for reading and writing from/to file

export async function getStoredNotes() {
  const rawFileContent = await fs.readFile('notes.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export function storeNotes(notes) {
    // we could be interacting with a DB here, but to keep things simple we will use a file as the storage.
    // Need to add the notes.json file to the root of the project for this.
  return fs.writeFile('notes.json', JSON.stringify({ notes: notes || [] }));
}