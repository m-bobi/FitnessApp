import { createConfirmation } from 'react-confirm';
import ConfirmDialog from './ConfirmDialog';

const confirm = createConfirmation(ConfirmDialog);

export default function showConfirm(message) {
return confirm({ message })
.then(result => result)
.catch(() => false);
}