export const teamRepoMasterProtection = (teamName) => {
  return {
    'branch_name': 'master',
    'enable_push': false,
    'enable_push_whitelist': false,
    'push_whitelist_usernames': [],
    'push_whitelist_teams': [],
    'push_whitelist_deploy_keys': false,
    'enable_merge_whitelist': true,
    'merge_whitelist_usernames': [],
    'merge_whitelist_teams': ['owners', teamName],
    'enable_status_check': true,
    'status_check_contexts': null,
    'required_approvals': 1,
    'enable_approvals_whitelist': true,
    'approvals_whitelist_username': [],
    'approvals_whitelist_teams': ['owners', teamName],
    'block_on_rejected_reviews': false,
    'block_on_outdated_branch': false,
    'dismiss_stale_approvals': false,
    'require_signed_commits': false,
    'protected_file_patterns': '',
  };
};
