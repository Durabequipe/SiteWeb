export class Player {
  constructor(id: string, projectId: string) {
    document.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML =
          'Hello from Player with id: ' +
          id +
          ' and projectId: ' +
          projectId +
          '';
      }
    });
  }
}
