import css from './Modal.module.css';

export const Modal = ({ urlImg, onCloseBtb }) => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={urlImg} alt="" />
		  <button className={css.btn} type='button' onClick={onCloseBtb}>	<span>&times;</span></button>
      </div>
    </div>
  );
};
