export class MyQuery {
  static createProject = `INSERT INTO project 
                        (boundary, door_position, area, project_img, project_icon, user_id)
                        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name`;

  static createVersion = `INSERT INTO version
                        (version_img, version_icon, constraints, project_id)
                        VALUES ($1, $2, $3, $4) RETURNING id, name`;

  static getProject = `SELECT * FROM project WHERE id = $1`;

  static getProjectCopy = `SELECT boundary, door_position, area FROM project WHERE id = $1`;

  static getProjects = `SELECT id, name, project_img, project_icon , created_at, is_trashed FROM project WHERE user_id = $1 ORDER BY id ASC`;

  static getVersions = `SELECT * FROM version WHERE project_id = $1`;

  static updateProjectName = `UPDATE project SET name = $1 WHERE id = $2`;

  static updateVersionName = `UPDATE version SET name = $1 WHERE id = $2`;

  static moveProjectToTrash = `UPDATE project SET is_trashed = true WHERE id = $1`;

  static moveVersionToTrash = `UPDATE version SET is_trashed = true WHERE id = $1`;

  static restoreProjectFromTrash = `UPDATE project SET is_trashed = false WHERE id = $1`;

  static restoreVersionFromTrash = `UPDATE version SET is_trashed = false WHERE id = $1`;

  static deleteProject = `DELETE FROM project WHERE id = $1`;

  static deleteVersion = `DELETE FROM version WHERE id = $1`;
}
