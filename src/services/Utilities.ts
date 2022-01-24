export function lowerCaseFirstLetter(string: string): string {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export function replaceStringWithIcon(string: string): string {
  return string.replace(/@a/g, "👤").replace(/@m/g, "👨").replace(/@f/g, "👩");
}

export function replaceIconWithString(string: string): string {
  return string.replace(/👤/g, "@a").replace(/👨/g, "@m").replace(/👩/g, "@f");
}

export function replaceCurrentPlayerStringWithIcon(string: string): string {
  return string
    .replace(/@ca/g, "👤")
    .replace(/@cm/g, "👨")
    .replace(/@cf/g, "👩");
}

export const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const titleSuffix = " | Truth or Dare";

export const setSeoTitle = (title: string, displaySuffix = true) => {
  document.title = `${title}${displaySuffix ? titleSuffix : ""}`;
};

export function countGenderOccurrences(string: string): {
  male: number;
  female: number;
  any: number;
} {
  return {
    male: string.split("@m").length - 1,
    female: string.split("@f").length - 1,
    any: string.split("@a").length - 1,
  };
}
