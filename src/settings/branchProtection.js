export const teamRepoMasterProtection = () => {
  return {
    'branch_name': 'master',
    'enable_push': false,
    'enable_push_whitelist': false,
    'push_whitelist_usernames': [],
    'push_whitelist_teams': [],
    'push_whitelist_deploy_keys': false,
    'enable_merge_whitelist': false,
    'merge_whitelist_usernames': [],
    'merge_whitelist_teams': [],
    'enable_status_check': true,
    'status_check_contexts': null,
    'required_approvals': 3,
    'enable_approvals_whitelist': false,
    'approvals_whitelist_username': [],
    'approvals_whitelist_teams': [],
    'block_on_rejected_reviews': false,
    'block_on_outdated_branch': false,
    'dismiss_stale_approvals': false,
    'require_signed_commits': false,
    'protected_file_patterns': '',
  };
};
