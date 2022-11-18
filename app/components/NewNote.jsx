import { Form, useActionData, useTransition as useNavigation } from '@remix-run/react';
import styles from './NewNote.css';


function NewNote() {
  // still have access to action data here because this component inside notes.jsx with action
  const data = useActionData();

  // contains useful information about ungoing request that might be happening behind the scenes
  const navigation = useNavigation();
  // i.e.
  // navigation.state === 'idle' or 'loading' or 'submitting'
  // navigation.submission.action/method/formData
  // navigation.type === 'actionRedirect' (was redirected)/'actionReload'/etc
  const isSubmitting = navigation.state === 'submitting';

  /* embrace Remix default form actions, do not use old school React onSubmit etc.
    Also, because this form is used inside notes page, no need to include active="/notes"
    which would otherwise forward user to notes page upon submission.
    The post request will trigger the action function located on the page with this form.

    Use Form instead of form to keep to single page application and not rerender the entire page upon submit. Rewatch video where note made for more details.
  */
  return (
    <Form method="post" id="note-form">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add Note' /** might only see this change if backend slightly slower */}</button>
      </div>
    </Form>
  );
}

export default NewNote;

/* Remix will ignore this function because it's not inside a index file, but we can use it */
export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}