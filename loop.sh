while((1));do
    npm start s $1 student
    python3 pythonZhenXiang/create_personal_repo_in_org.py $1
    echo "Ai. Done. Sleep. Good night"
    sleep 300
done