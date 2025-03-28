import { body } from '../../utils/elementUtils';
import svgSprite from '../../sources/svg-sprite';

const svgSpriteElement = () => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgSprite, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;
  body.append(svgElement);
};

export default svgSpriteElement;

// const svgElement = svgDoc.documentElement;
// export default svgElement;
// body.append(svgElement);
