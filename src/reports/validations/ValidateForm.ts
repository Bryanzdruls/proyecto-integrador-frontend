export const validateForm = (formData: any) => {
  let formErrors: any = {};
  let isValid = true;

  if (!formData.title) {
    formErrors.title = 'El título es obligatorio';
    isValid = false;
  }

  if (!formData.description) {
    formErrors.description = 'La descripción es obligatoria';
    isValid = false;
  }

  if (!formData.date) {
    formErrors.date = 'La fecha es obligatoria';
    isValid = false;
  }

  if (!formData.type) {
    formErrors.type = 'El tipo es obligatorio';
    isValid = false;
  }

  if (!formData.companyContactNumber) {
    formErrors.companyContactNumber = 'El teléfono de contacto es obligatorio';
    isValid = false;
  }

  if (!formData.urgency) {
    formErrors.urgency = 'La urgencia es obligatoria';
    isValid = false;
  }
  // Validación de archivo adjunto
  if (!formData.attachment) {
    formErrors.attachment = 'El archivo adjunto es obligatorio';
    isValid = false;
  } else if (
    formData.attachment &&
    !['application/pdf', 'image/jpeg', 'image/png'].includes(formData.attachment.type)
  ) {
    formErrors.attachment = 'Solo se permiten archivos PDF o imágenes (JPG, PNG)';
    isValid = false;
  }

  return { formErrors, isValid };
};
