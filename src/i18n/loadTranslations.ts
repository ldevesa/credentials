import spanish from '../locales/es.json';
import english from '../locales/en.json';
import portuguese from '../locales/pt.json';

const LANG = {
	ENGLISH: 'en',
	SPANISH: 'es',
	PORTUGUESE: 'pt',
};

export const getI18N = (currentLocale: string) => {
	switch (currentLocale) {
		case LANG.ENGLISH:
			return english;
		case LANG.PORTUGUESE:
			return portuguese;
		default:
			return spanish; // Idioma por defecto
	}
};
