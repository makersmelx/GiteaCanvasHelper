export const projectTeamConfig = (teamName) => {
  return {
    'description': '',
    'includes_all_repositories': false,
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

