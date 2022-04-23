export const setCookie = (cname: string, cvalue: string) => {
  const d = new Date();
  d.setTime(d.getTime() + 3500 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  if (window.localStorage) {
    localStorage.setItem("keyExpires", d.toUTCString());
  }
};

export const getCookie = (cname: string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(
  user: {
    name: string;
    url?: any | undefined;
  },
  size: {
    width?: string | number;
    height?: string | number;
  }
) {
  return {
    sx: {
      bgcolor: stringToColor(user.name),
      width: size.width,
      height: size.height,
    },
    children: `${user.name.split(" ")[0][0]}${user.name.split(" ")[1][0]}`,
    src: user.url,
    alt: user.name || "Khach hang",
  };
}
