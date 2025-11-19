export const icons = {
  hk: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 512 512"
    >
      <path
        fill="var(--flag-palette-bright-red, #d80027)"
        d="M0 0h512v512H0z"
      />
      <path
        fill="var(--flag-palette-white, #eeeeee)"
        d="M282.4 193.7c-5.8 24.2-16.1 19.6-21.2 40.7a55.7 55.7 0 0 1 26-108.3c-10.1 42.2.4 46-4.8 67.6m-77.5 17.9c21.2 13 13.6 21.4 32.1 32.8a55.7 55.7 0 0 1-94.9-58.2c37 22.7 43.8 13.8 62.8 25.4m-6.9 79.3c19-16.2 24.6-6.4 41-20.4a55.7 55.7 0 0 1-84.6 72.2c33-28.2 26.6-37.4 43.6-51.8m73.3 31.1c-9.6-23 1.5-25.4-6.8-45.4a55.7 55.7 0 0 1 42.6 102.8c-16.6-40-27.3-36.9-35.8-57.4m52.2-60.1c-24.9 2-23.7-9.3-45.3-7.6a55.7 55.7 0 0 1 111-8.7c-43.3 3.4-43.6 14.5-65.7 16.3"
      />
    </svg>
  ),
  sg: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 512 512"
    >
      <path fill="var(--flag-palette-white, #eeeeee)" d="M0 204.9h512V512H0z" />
      <path
        fill="var(--flag-palette-bright-red, #d80027)"
        d="M0 0h512v256H0z"
      />
      <path
        fill="var(--flag-palette-white, #eeeeee)"
        d="M83.5 128a78 78 0 0 1 61.2-76.1q-8.1-1.8-16.7-1.8a78 78 0 1 0 16.7 154A78 78 0 0 1 83.5 128m100.1-72.3 5.6 17H207l-14.5 10.5 5.5 17-14.5-10.5-14.4 10.5 5.5-17-14.5-10.5h18z"
      />
      <path
        fill="var(--flag-palette-white, #eeeeee)"
        d="m140.3 89 5.5 17h17.9l-14.5 10.6 5.5 17-14.4-10.5-14.5 10.5 5.5-17L117 106h17.8zm86.7 0 5.5 17h18L236 116.6l5.5 17L227 123l-14.4 10.5 5.5-17-14.5-10.6h17.9zm-16.7 50.1 5.6 17h17.8l-14.4 10.5 5.5 17-14.5-10.5-14.4 10.6 5.5-17-14.5-10.6h17.9zm-53.3 0 5.5 17h17.9l-14.5 10.5 5.5 17-14.4-10.5-14.5 10.6 5.5-17-14.4-10.6h17.8z"
      />
    </svg>
  ),
  id: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 512 512"
    >
      <path
        fill="var(--flag-palette-dark-red, #a2001d)"
        d="M512 307.2H0V0h512z"
      />
      <path fill="var(--flag-palette-white, #eeeeee)" d="M512 512H0V256h512z" />
    </svg>
  ),
  my: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 512 512"
    >
      <path fill="var(--flag-palette-white, #eeeeee)" d="M0 0h512v512H0z" />
      <path
        fill="var(--flag-palette-bright-red, #d80027)"
        d="M0 122.4V55.7h512v66.7zM0 256v-66.8h512V256zm0 133.6v-66.8h512v66.8zM0 512h512v-55.7H0z"
      />
      <path fill="var(--flag-palette-blue, #0052b4)" d="M0 0h256v256H0z" />
      <path
        fill="var(--flag-palette-yellow, #ffda44)"
        d="M84 128a63.3 63.3 0 0 0 93.5 55.7 78 78 0 1 1 0-111.4A63.3 63.3 0 0 0 84 128"
      />
      <path
        fill="var(--flag-palette-yellow, #ffda44)"
        d="m176.5 107-11.3-23.5L154 107l-25.4-5.9 11.4 23.5-20.5 16.1 25.5 5.8-.1 26 20.3-16.3 20.3 16.3v-26l25.4-5.8-20.4-16.1 11.3-23.5z"
      />
    </svg>
  ),
  th: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 512 512"
    >
      <path fill="var(--flag-palette-white, #eeeeee)" d="M0 0h512v512H0z" />
      <path
        fill="var(--flag-palette-bright-red, #d80027)"
        d="M512 512H0v-85.3h512zm0-426.7H0V0h512z"
      />
      <path
        fill="var(--flag-palette-navy, #002266)"
        d="M0 170.7h512v170.7H0z"
      />
    </svg>
  ),
};

export type IconName = keyof typeof icons;
