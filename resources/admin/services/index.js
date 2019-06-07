import moment from 'moment';

export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function truncateWithEllipses(text, max = 400) {
  return text.substr(0,max-1)+(text.length>max?'...':'');
}

export function redirect(ctx, path) {
  ctx.props.history.push(path)
}

export function formatedDate(date) {
  return moment(date).format('DD/MM/YY')
}

export function buildUrlPost({category, slug}) {
  let url = `javascript:void()`;

  if(category) {
    const titleSlug = slug;
    const categorySlug = category.slug;
    url = `/${categorySlug}/${titleSlug}`;
  }

  return url;
}