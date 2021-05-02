const addId = (n, id) => {
  return n + (1n << BigInt(id));
};

const hasId = (n, id) => {
  return ((n >> BigInt(id)) & 1n) !== 0;
};

const getReadComics = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      ['readComics'],
      ({ readComics }) => resolve(BigInt(readComics))
    );
  });
};

const setReadComics = (readComics) => {
  return new Promise((resolve) => {
    chrome.storage.sync.set({
      readComics: readComics.toString()
    }, resolve);
  });
};

const addReadComics = async (comics) => {
  const readComics = await getReadComics() | comics;
  return setReadComics(readComics);
};

const addReadComic = async (id) => {
  return addReadComics(1n << BigInt(id));
};

const parseUrl = (url) => {
  const { host, pathname } = new URL(url);
  if (host !== 'xkcd.com') return NaN;
  if (!pathname.match(/^\/\d+\/$/)) return NaN;
  return parseInt(pathname.match(/\d+/)[0], 10);
}
