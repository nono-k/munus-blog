import { formatDateToYYYYMMDD } from '@/utils/date-utils';
import { loadDefaultJapaneseParser } from 'budoux';
import satori from 'satori';
import sharp from 'sharp';

const parser = loadDefaultJapaneseParser();

export async function getOgImage(title: string, tags?: string[], date?: Date) {
  const fontTitle = (await getFontData('Kiwi+Maru')) as ArrayBuffer;
  const fontTitleEn = (await getFontData('IBM+Plex+Mono')) as ArrayBuffer;
  const fontSiteName = (await getFontData('Genos')) as ArrayBuffer;

  const words = parser.parse(title);
  const tagElements = tags?.map(tag => `${tag}`) ?? [];
  const dateString = date ? formatDateToYYYYMMDD(date) : 'N/A';

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        paddingTop: 96,
        paddingBottom: 48,
        paddingLeft: 96,
        paddingRight: 96,
        height: '100%',
        backgroundColor: '#f0eee7',
        backgroundImage:
          'linear-gradient(#dcdad3 1px, transparent 1px), linear-gradient(to right, #dcdad3 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        backgroundPosition: '-14px 14px',
        color: '#2e2e2e',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: 48,
            maxWidth: 1000,
            fontWeight: 500,
            display: 'flex',
            flexWrap: 'wrap',
            paddingBottom: 16,
            borderBottom: '1px solid #2e2e2e',
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
        <div style={{ display: 'flex', marginTop: 16, gap: 40 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            公開日:
            <span style={{ marginLeft: 12, color: '#555555' }}>
              {dateString}
            </span>
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Tags:
            <div
              style={{
                fontSize: 24,
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {tagElements.map(tag => (
                <span key={tag} style={{ marginLeft: 12, color: '#555555' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontFamily: 'Genos',
            fontWeight: 500,
            lineHeight: 1,
            alignSelf: 'flex-end',
            marginTop: 'auto',
          }}
        >
          Munus
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
