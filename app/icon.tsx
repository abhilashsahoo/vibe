import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, hsl(250, 90%, 58%), hsl(340, 82%, 58%))',
          color: 'white',
          borderRadius: 6,
        }}
      >
        V
      </div>
    ),
    size
  );
}
