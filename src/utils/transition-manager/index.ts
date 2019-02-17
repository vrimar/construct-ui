class TransitionManager {
  /** Whether transitions are active */
  public isEnabled = true;

  /** Enable all transitions */
  public enable() {
    this.isEnabled = true;
  }

  /** Disable all transitions */
  public disable() {
    return this.isEnabled = false;
  }
}

export default new TransitionManager();
