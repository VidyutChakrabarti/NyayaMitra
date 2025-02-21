from agents import Main_agents
from tasks import Main_Tasks
from crewai import Crew, Process

main_agents = Main_agents()
main_tasks = Main_Tasks()

parser = main_agents.Parser()
parse = main_tasks.parse(parser)

crew = Crew(
                agents = [parser], 
                tasks = [parse], 
            )
