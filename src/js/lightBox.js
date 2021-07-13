  
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default function onLightboxOpen(evt) {
  console.log(evt.target);
    if (evt.target.nodeName !== 'IMG') {
      return;
    }
    basicLightbox.create(`<img src="${evt.target.dataset.src}" width="700" height="500">`).show();
}
