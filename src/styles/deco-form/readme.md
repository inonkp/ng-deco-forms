# Overriding deco-form styles

The names of the internal classes of the "deco-forms" (hereinafter just "library") prepared for overriding sholud have prefix "deco-".

## File naming

### File "\_fields.scss"

Is used to override the internal styles of the library Fields. For example, deco-text or deco-checkbox.

### File "\_wrappers.scss"

Is used to override the internal styles of the library Wrappers. For example, deco-field-label or deco-field-hint.

### File "\_custom-classes.scss"

Is used to describe our own deco form customization styles. We create and use these styles at the project level and pass them as configuration options when setting up the deco form structure.
This custom styles have prefix "etsy-form-" and are ready for use at the project level in different instances of deco forms.

## Complex classes

### etsy-form-field-container-35

Class ".etsy-form-field-container-35" designed for custom setting the width of the form field to 35%.

### etsy-form-row-container

Class ".etsy-form-row-container" designed to customize the row direction, line height and space between elements.

### etsy-form-row-container-75

Class ".etsy-form-row-container-75" designed to set the width of the etsy-form-row-container to 75%.
