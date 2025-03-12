import { forwardRef } from 'react';
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom';

const GenericModal = forwardRef(function ResultModal({title, desc, redirect}, ref) {
  const navigate = useNavigate();
  return createPortal(
    <dialog ref={ref} onClose={redirect ? () => navigate(redirect) : undefined }>
      <h2>{title}</h2> 
      <p>{desc}</p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  )
})

export default GenericModal;