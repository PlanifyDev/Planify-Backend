"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyQuery = void 0;
class MyQuery {
}
exports.MyQuery = MyQuery;
MyQuery.createProject = `INSERT INTO project 
                        (name, boundary, door_position, constraints, project_img, project_icon, user_id)
                        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
MyQuery.createVersion = `INSERT INTO version
                        (name, version_img, version_icon, project_id)
                        VALUES ($1, $2, $3, $4) RETURNING id`;
MyQuery.getProject = `SELECT * FROM project WHERE id = $1`;
MyQuery.getProjectCopy = `SELECT boundary, door_position, constraints FROM project WHERE id = $1`;
MyQuery.getProjects = `SELECT id, name, project_img, project_icon , created_at, is_trashed FROM project WHERE user_id = $1 ORDER BY id ASC`;
MyQuery.getVersions = `SELECT * FROM version WHERE project_id = $1`;
MyQuery.updateProjectName = `UPDATE project SET name = $1 WHERE id = $2`;
MyQuery.updateVersionName = `UPDATE version SET name = $1 WHERE id = $2`;
MyQuery.moveProjectToTrash = `UPDATE project SET is_trashed = true WHERE id = $1`;
MyQuery.moveVersionToTrash = `UPDATE version SET is_trashed = true WHERE id = $1`;
MyQuery.restoreProjectFromTrash = `UPDATE project SET is_trashed = false WHERE id = $1`;
MyQuery.restoreVersionFromTrash = `UPDATE version SET is_trashed = false WHERE id = $1`;
MyQuery.deleteProject = `DELETE FROM project WHERE id = $1`;
MyQuery.deleteVersion = `DELETE FROM version WHERE id = $1`;
//# sourceMappingURL=query.js.map