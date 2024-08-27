export const getBoxDecoration = ({
    borderRadius = 10,
    color = '#ffffff',
    spreadRadius = 0,
    blurRadius = 20,
    showShadow = true,
    shadowColor = '#000000',
    shadowOpacity = 0.06,
    offsetX = 0,
    offsetY = 4,
  }) => {
    const boxShadow = showShadow
      ? `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${shadowColor}${Math.round(shadowOpacity * 255).toString(16)}`
      : 'none';
  
    return {
      borderRadius: `${borderRadius}px`,
      backgroundColor: color,
      boxShadow: boxShadow,
    };
  };
  
  export const getBorderBoxDecoration = ({
    borderRadius = 16,
    color = '#ffffff',
    borderWidth = 1,
    borderColor = '#CACACA', // Replace with your equivalent AppColors.frenchGrey
    spreadRadius = 0,
    blurRadius = 12,
    showShadow = true,
    shadowColor = '#000000', // Replace with your equivalent AppColors.black04
    offsetX = 0,
    offsetY = 4,
  }) => {
    const boxShadow = showShadow
      ? `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${shadowColor}`
      : 'none';
  
    return {
      borderRadius: `${borderRadius}px`,
      backgroundColor: color,
      border: `${borderWidth}px solid ${borderColor}`,
      boxShadow: boxShadow,
    };
  };
  