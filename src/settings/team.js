export const projectTeamConfig = (teamName, config = {}) => {
  return {
    'description': config.description || teamName,
    'includes_all_repositories': config.includes_all_repositories || false,
    'can_create_org_repo': config.can_create_org_repo || false,
    'name': config.name || teamName,
    'permission': config.permission || 'write',
    'units': config.units || [
      'repo.code',
      'repo.issues',
      'repo.ext_issues',
      'repo.wiki',
      'repo.pulls',
      'repo.releases',
      'repo.projects',
      'repo.ext_wiki'
    ]
  };
};


