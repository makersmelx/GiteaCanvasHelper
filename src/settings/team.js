export const projectTeamConfig = (teamName) => {
  return {
    'description': teamName,
    'includes_all_repositories': false,
    'can_create_org_repo': false,
    'name': teamName,
    'permission': 'write',
    'units': [
      'repo.code',
      'repo.issues',
      'repo.wiki',
      'repo.pulls',
      'repo.releases',
    ],
  };
};

