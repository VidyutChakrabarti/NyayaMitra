from crewai import Task 

class Main_Tasks():
    def parse(self, agent):
        return Task(
            description=(
                "Analyze the following passed text:\n{data}\n"
                "change the key names to be more intuitive and descriptive."
            ),
            expected_output=(
                "Your output must be a json with camelcase keys.\n"
            ),
            agent=agent,
        )