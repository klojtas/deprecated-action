const core = require('@actions/core');

async function run() {
  try {
    const startDate = new Date(core.getInput('start-date'));
    const daysTillError = parseInt(core.getInput('days-till-error'), 10);
    const warningMessage = core.getInput('warning-message');
    const errorMessage = core.getInput('error-message');

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
      core.setFailed(errorMessage);
      core.summary.addRaw(errorMessage).write();
    } else {
      core.warning(warningMessage);
      core.setOutput('deprecation-message', warningMessage);
      core.summary.addRaw(warningMessage).write();
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
