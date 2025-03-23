import { loadDefaultJapaneseParser } from 'budoux';
import satori from 'satori';
import sharp from 'sharp';

const parser = loadDefaultJapaneseParser();

export async function getOgImage(title: string) {
  const fontTitle = (await getFontData('Kiwi+Maru')) as ArrayBuffer;
  const fontTitleEn = (await getFontData('IBM+Plex+Mono')) as ArrayBuffer;
  const fontSiteName = (await getFontData('Genos')) as ArrayBuffer;

  const words = parser.parse(title);

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        padding: 48,
        height: '100%',
        backgroundImage:
          ' linear-gradient(-45deg, #355C7D 0%, #6C5B7B 50%, #C06C84 100%)',
        color: '#000',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          backgroundColor: 'white',
          padding: 48,
          borderRadius: 12,
        }}
      >
        <div
          style={{
            fontSize: 56,
            maxWidth: 1000,
            fontWeight: 500,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {words.map(word => {
            return (
              <span key={word} style={{ display: 'block' }}>
                {word}
              </span>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src='https://avatars.githubusercontent.com/u/142199384?s=400&u=3d47e6ba7fd3d1232c1bcd2c8d29af777e28cca2&v=4'
              width={80}
              height={80}
              alt=''
              style={{ borderRadius: 9999, marginRight: 20 }}
            />
            かめのの
          </div>
          <div
            style={{
              fontSize: 64,
              fontFamily: 'Genos',
              fontWeight: 500,
              lineHeight: 1,
              alignSelf: 'flex-end',
            }}
          >
            Munus
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'IBM+Plex+Mono',
          data: fontTitleEn,
          weight: 500,
          style: 'normal',
        },
        {
          name: 'Kiwi+Maru',
          data: fontTitle,
          weight: 500,
          style: 'normal',
        },
        {
          name: 'Genos',
          data: fontSiteName,
          weight: 500,
          style: 'normal',
        },
      ],
    },
  );
  return await sharp(Buffer.from(svg)).png().toBuffer();
}

async function getFontData(font: string) {
  const API = `https://fonts.googleapis.com/css2?family=${font}`;

  const css = await (
    await fetch(API, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (!resource) return;

  return await fetch(resource[1]).then(res => res.arrayBuffer());
}
