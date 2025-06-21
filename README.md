# Password strength calculator

This is a simple application for calculating strength of a password. It is used for educational purposes.

## Technologies

- This application is written in TypeScript.
- UI is implemented using React library.
- Build is performed by Vite.
- Tests are written in Vitest.

## Getting started

1. Install dependencies via `npm install`
2. Build the project via `npm run build`
3. Start the application via `npm start`

## Bugs

Bugs are documented in the code and referenced by their number.

1. Does not count + and - as special characters.
2. Counts 0 as lowercase character instead of number.
3. Typo under "Typy symbolů" → "spciální znaky" should be "speciální znaky"
4. Password of length 5 is considered weak instead of unacceptable even if it otherwise meets weak password requirements.
5. Password of length 11 is considered fair instead of strong even if it otherwise meets strong password requirements.
6. Characters with diacritics are not forbidden.
7. Fair password also accepts a single uppercase character at the end (breaking the special rule).
8. Strong password allows sequence of 6 characters of the same category instead of maximum of 5.
9. Weak password accepts any sequence of lowercase, uppercase or numbers (does not require at least one of each).
10. Fair password is called "střední" in evaluation badge and "průměrné" in rules table.
