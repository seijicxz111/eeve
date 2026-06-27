export function composeEventHandlers<Event extends { defaultPrevented: boolean }>(
  theirHandler?: (event: Event) => void,
  ourHandler?: (event: Event) => void,
  options: { checkForDefaultPrevented?: boolean } = {}
) {
  const { checkForDefaultPrevented = true } = options;

  return (event: Event) => {
    theirHandler?.(event);

    if (!checkForDefaultPrevented || !event.defaultPrevented) {
      ourHandler?.(event);
    }
  };
}
