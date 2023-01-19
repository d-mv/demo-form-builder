import classes from './Intro.module.scss';

export function Intro() {
  return (
    <div className={classes.container}>
      <h5>Workflow</h5>
      <p className='p4'>1. Administrator creates form</p>
      <p className='p4'>2. Requestor send form request for review</p>
      <p className='p4'>3. Reviewer fills out the form</p>
      <p className='p4'>4. Requestor receives the answers</p>
    </div>
  );
}
