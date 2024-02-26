import { render, screen, fireEvent } from '@testing-library/react';
import { DevicesStatus } from './DevicesStatus';
import primaryLogo from '../../assets/images/devices/status-primary.svg';
import { ConnectivityStatus } from '../../interfaces/devices/devices';
import { I18nextProvider } from 'react-i18next';
import i18next from '../../i18n';

const mockedProps = {
  urlImage: primaryLogo,
  status: 'onPrimary' as ConnectivityStatus,
  statusAmount: 1,
};

describe('DevicesStatus', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <I18nextProvider i18n={i18next}>
        <DevicesStatus
          urlImage={mockedProps.urlImage}
          status={mockedProps.status}
          statusAmount={mockedProps.statusAmount}
        />
      </I18nextProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <I18nextProvider i18n={i18next}>
        <DevicesStatus
          urlImage={mockedProps.urlImage}
          status={'onPrimary' as ConnectivityStatus}
          statusAmount={mockedProps.statusAmount}
        />
      </I18nextProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <I18nextProvider i18n={i18next}>
        <DevicesStatus
          urlImage={mockedProps.urlImage}
          status={'offline' as ConnectivityStatus}
          statusAmount={mockedProps.statusAmount}
        />
      </I18nextProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it("correct rendering of 'On Primary' status and the number of devices with that status", async (): Promise<void> => {
    mockedProps.statusAmount = 5;
    const { getAllByText } = render(
      <I18nextProvider i18n={i18next}>
        <DevicesStatus
          urlImage={mockedProps.urlImage}
          status={mockedProps.status}
          statusAmount={mockedProps.statusAmount}
        />
      </I18nextProvider>
    );
    expect(getAllByText(/On Primary/gi)).toBeDefined();
    expect(getAllByText(/5/gi)).toBeDefined();
  });

  it('should handle checkbox action', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <DevicesStatus
          urlImage={mockedProps.urlImage}
          status={mockedProps.status}
          statusAmount={mockedProps.statusAmount}
        />
      </I18nextProvider>
    );
    fireEvent.click(screen.getByRole('checkbox'));
  });

  it('should render successfully with default props', () => {
    const { baseElement } = render(
      <I18nextProvider i18n={i18next}>
        <DevicesStatus urlImage={mockedProps.urlImage} />
      </I18nextProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should set statusColorText to ONPRIMARY for ConnectivityStatus.onPrimary', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <DevicesStatus
          urlImage={mockedProps.urlImage}
          status={'onPrimary' as ConnectivityStatus}
        />
      </I18nextProvider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDefined();

    const statusColorTextElement = screen.getByText('On Primary');
    expect(statusColorTextElement).toBeDefined();
  });

  it('should set statusColorText to UNKNOWN for ConnectivityStatus.unknown', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <DevicesStatus
          urlImage={mockedProps.urlImage}
          status={'unknown' as ConnectivityStatus}
        />
      </I18nextProvider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDefined();

    const statusColorTextElement = screen.getByText('Unknown');
    expect(statusColorTextElement).toBeDefined();
  });

  it('should set statusColorText to ONBACKUP for ConnectivityStatus.onBackup', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <DevicesStatus
          urlImage={mockedProps.urlImage}
          status={'onBackup' as ConnectivityStatus}
        />
      </I18nextProvider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDefined();

    const statusColorTextElement = screen.getByText('On Backup');
    expect(statusColorTextElement).toBeDefined();
  });

  it('should set statusColorText to OFFLINE for ConnectivityStatus.offline', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <DevicesStatus
          urlImage={mockedProps.urlImage}
          status={'offline' as ConnectivityStatus}
        />
      </I18nextProvider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDefined();

    const statusColorTextElement = screen.getByText('Offline');
    expect(statusColorTextElement).toBeDefined();
  });

  it('should set statusColorText to INDETERMINATE for ConnectivityStatus.indeterminate', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <DevicesStatus
          urlImage={mockedProps.urlImage}
          status={'indeterminate' as ConnectivityStatus}
        />
      </I18nextProvider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDefined();

    const statusColorTextElement = screen.getByText('Indeterminate');
    expect(statusColorTextElement).toBeDefined();
  });
});
