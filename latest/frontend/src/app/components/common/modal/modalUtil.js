import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import ModalBox from './ModalBox.jsx';

export default {
  showModal: function (content, options) {
    const container = document.getElementById('modal-container');
    let modalComponent = null;

    function showContainer() {
      container.style.display = 'block';
    }

    function hideContainer() {
      container.style.display = 'none';
    }

    function closeModal() {
      unmountComponentAtNode(container);
      hideContainer();
    }

    render(<ModalBox ref={(ref) => { modalComponent = ref } }
                     title={options.title}
                     onClose={ () => { closeModal() } }>
      { content }
    </ModalBox>, container);

    showContainer();

    return {
      close: function () {
        closeModal();
      },
      modalComponent: function() {
        return modalComponent;
      }
    };
  }

};
