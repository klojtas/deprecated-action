const core = require('@actions/core');

try {
  const startDate = new Date(core.getInput('start-date'));
  const daysTillError = parseInt(core.getInput('days-till-error'), 10);
  const warningMessage = core.getInput('warning-message');

  if (isNaN(startDate.getTime())) {
    core.setFailed('Invalid start-date. Please provide a date in YYYY-MM-DD format.');
    return;
  }

  if (isNaN(daysTillError)) {
    core.setFailed('Invalid days-till-error. Please provide an integer.');
    return;
  }

  const currentDate = new Date();
  const errorDate = new Date(startDate);
  errorDate.setDate(startDate.getDate() + daysTillError);

  if (currentDate >= errorDate) {
    core.setFailed(`ERROR: ${warningMessage}`);
  } else {
    core.warning(`WARNING: ${warningMessage}`);
    core.setOutput('deprecation-message', `WARNING: ${warningMessage}`);
  }
} catch (error) {
  core.setFailed(error.message);
}
