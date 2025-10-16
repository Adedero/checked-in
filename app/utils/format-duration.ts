type TimeUnitStyle = 'full' | 'short' | 'symbol';

interface FormatDurationOptions {
  /** If true, input is milliseconds. Otherwise, seconds. */
  ms?: boolean;
  /** Controls how units are displayed */
  style?: TimeUnitStyle;
  /** Whether to include units with zero values (e.g. show "0 hr") */
  showZero?: boolean;
}

export function formatDuration(
  input: number,
  options: FormatDurationOptions = {}
): string {
  const { ms = false, style = 'short', showZero = false } = options;

  let totalSeconds = ms ? Math.floor(input / 1000) : Math.floor(input);

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const labels = {
    full: {
      h: ['hour', 'hours'],
      m: ['minute', 'minutes'],
      s: ['second', 'seconds']
    },
    short: { h: ['hr', 'hrs'], m: ['min', 'mins'], s: ['sec', 'secs'] },
    symbol: { h: ['h', 'h'], m: ['m', 'm'], s: ['s', 's'] }
  }[style];

  const parts: string[] = [];

  if (hours || showZero)
    parts.push(`${hours} ${hours === 1 ? labels.h[0] : labels.h[1]}`);

  if (minutes || (showZero && (hours || seconds)))
    parts.push(`${minutes} ${minutes === 1 ? labels.m[0] : labels.m[1]}`);

  if (seconds || (!hours && !minutes) || showZero)
    parts.push(`${seconds} ${seconds === 1 ? labels.s[0] : labels.s[1]}`);

  return parts.join(' ');
}
