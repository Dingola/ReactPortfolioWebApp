import { describe, expect, it } from 'vitest';

import { translateMessage } from './messages';
import { germanTranslations } from './translations.de';

describe('translateMessage', () => {
  it('translates English source messages into German', () => {
    const source = 'Return to the home page';

    expect(translateMessage('de', source)).toBe(germanTranslations[source]);
  });

  it('returns English source messages unchanged for the English locale', () => {
    expect(translateMessage('en', 'Return to the home page')).toBe('Return to the home page');
  });
});
