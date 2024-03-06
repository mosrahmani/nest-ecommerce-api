import slugify from "slugify";

export const slugifyForRoute = (value: string) => {
  return slugify(value, {
    lower: true,
    remove: /[*+~=.()'"!/|\-_#$%^<>,.?;`:@]/g,
  });
}
  