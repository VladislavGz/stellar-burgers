import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div data-testid='cy_modal_overlay' className={styles.overlay} onClick={onClick} />
);
