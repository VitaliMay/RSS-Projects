import './about-page.scss';
import constrols from '../../store/constrols';
import createButton from '../../components/button/button';
import { createEl } from '../../utils/elementUtils';

function createAboutPage(parent) {
  const aboutPage = createEl({
    tag: 'article',
    classes: ['modal', 'center'],
    parent,
  });

  constrols.page.about = aboutPage;

  const textContent = 'Это приложение создано мной и пока работают только основные базовые функции';
  createEl({
    tag: 'h2',
    classes: ['modal__title'],
    text: textContent,
    parent: aboutPage,
  });

  const buttonBack = createButton('Back', aboutPage);
  buttonBack.addEventListener('click', () => {
    window.location.hash = '/';
  });
}

export default createAboutPage;
