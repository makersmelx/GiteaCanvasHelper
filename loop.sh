if [ $1 ];then
    while((1));do
        npm start s $1 student
        python3 CreatePersonalRepo/CreatePersonalRepo $1
        echo "Ai. Done. Sleep. Good night"
        sleep 300
    done
else
    echo "Missing one argument for course name"
fi
