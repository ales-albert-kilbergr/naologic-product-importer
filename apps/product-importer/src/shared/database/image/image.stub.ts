import { stringStub, urlStub } from '@naologic/testing-common-stubs';
import { Image } from './image.schema';

export function ImageName(): string {
  const fileName = stringStub(12);
  const fileExtension = Math.random() > 0.5 ? 'jpg' : 'png';

  return `${fileName}.${fileExtension}`;
}

export function ImageStub(override: Partial<Image> = {}): Image {
  const fileName = ImageName();
  const url = urlStub();
  return {
    fileName,
    cdnLink: `${url}/${fileName}`,
    i: 0,
    alt: stringStub(64),
    ...override,
  } as Image;
}

export function ImageListStub(count: number): Image[] {
  return Array(count)
    .fill(null)
    .map(() => ImageStub());
}
