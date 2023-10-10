import css from './Modal.module.css';

export const Modal = ({ urlImg }) => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={urlImg} alt="" />
      </div>
    </div>
  );
};
