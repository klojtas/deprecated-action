const core = require('@actions/core');
const process = require('process');
const cp = require('child_process');
const path = require('path');

describe('deprecated-action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should output a warning message when current date is before error date', () => {
    // Mock input values
    process.env['INPUT_START-DATE'] = '2025-01-01';
    process.env['INPUT_DAYS-TILL-ERROR'] = '30';
    process.env['INPUT_WARNING-MESSAGE'] = 'This is a warning.';
    process.env['INPUT_ERROR-MESSAGE'] = 'This is an error.';

    // Mock core.warning and core.setFailed
    const warningMock = jest.spyOn(core, 'warning').mockImplementation(() => {});
    const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation(() => {});
    const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation(() => {});

    // Mock Date to control the current date for testing
    const mockDate = new Date('2025-01-15T12:00:00.000Z'); // Date before error date (Jan 31, 2025)
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    const ip = path.join(__dirname, '..', 'index.js');
    cp.execSync(`node ${ip}`, { env: process.env });

    expect(warningMock).toHaveBeenCalledWith('This is a warning.');
    expect(setOutputMock).toHaveBeenCalledWith('deprecation-message', 'This is a warning.');
    expect(setFailedMock).not.toHaveBeenCalled();

    spy.mockRestore();
  });

  it('should set action to failed when current date is on or after error date', () => {
    // Mock input values
    process.env['INPUT_START-DATE'] = '2025-01-01';
    process.env['INPUT_DAYS-TILL-ERROR'] = '30';
    process.env['INPUT_WARNING-MESSAGE'] = 'This is a warning.';
    process.env['INPUT_ERROR-MESSAGE'] = 'This is an error.';

    // Mock core.warning and core.setFailed
    const warningMock = jest.spyOn(core, 'warning').mockImplementation(() => {});
    const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation(() => {});
    const setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation(() => {});

    // Mock Date to control the current date for testing
    const mockDate = new Date('2025-02-01T12:00:00.000Z'); // Date on error date (Jan 31, 2025)
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    const ip = path.join(__dirname, '..', 'index.js');
    cp.execSync(`node ${ip}`, { env: process.env });

    expect(setFailedMock).toHaveBeenCalledWith('This is an error.');
    expect(warningMock).not.toHaveBeenCalled();
    expect(setOutputMock).not.toHaveBeenCalled();

    spy.mockRestore();
  });

  it('should handle invalid start-date input', () => {
    process.env['INPUT_START-DATE'] = 'invalid-date';
    process.env['INPUT_DAYS-TILL-ERROR'] = '30';
    process.env['INPUT_WARNING-MESSAGE'] = 'This is a warning.';
    process.env['INPUT_ERROR-MESSAGE'] = 'This is an error.';

    const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation(() => {});

    const ip = path.join(__dirname, '..', 'index.js');
    cp.execSync(`node ${ip}`, { env: process.env });

    expect(setFailedMock).toHaveBeenCalledWith('Invalid start-date. Please provide a date in YYYY-MM-DD format.');
  });

  it('should handle invalid days-till-error input', () => {
    process.env['INPUT_START-DATE'] = '2025-01-01';
    process.env['INPUT_DAYS-TILL-ERROR'] = 'abc';
    process.env['INPUT_WARNING-MESSAGE'] = 'This is a warning.';
    process.env['INPUT_ERROR-MESSAGE'] = 'This is an error.';

    const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation(() => {});

    const ip = path.join(__dirname, '..', 'index.js');
    cp.execSync(`node ${ip}`, { env: process.env });

    expect(setFailedMock).toHaveBeenCalledWith('Invalid days-till-error. Please provide an integer.');
  });
});
