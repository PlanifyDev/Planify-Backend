export class MyQuery {
  static createProject = `INSERT INTO project (name, boundary, image_url, user_id) VALUES ($1, $2, $3, $4)`;

  static createVersion = `INSERT INTO version (version_num, name, image_url, project_id) VALUES ($1, $2, $3, $4)`;

  static getProjects = `SELECT * FROM project WHERE user_id = $1`;

  static getVersions = `SELECT * FROM version WHERE project_id = $1`;

  static updateProjectName = `UPDATE project SET name = $1 WHERE project_id = $2`;

  static updateVersionName = `UPDATE version SET name = $1 WHERE version_id = $2`;

  static moveProjectToTrash = `UPDATE project SET is_trashed = true WHERE project_id = $1`;

  static moveVersionToTrash = `UPDATE version SET is_trashed = true WHERE version_id = $1`;

  static restoreProjectFromTrash = `UPDATE project SET is_trashed = false WHERE project_id = $1`;

  static restoreVersionFromTrash = `UPDATE version SET is_trashed = false WHERE version_id = $1`;

  static deleteProject = `DELETE FROM project WHERE project_id = $1`;

  static deleteVersion = `DELETE FROM version WHERE version_id = $1`;
}
